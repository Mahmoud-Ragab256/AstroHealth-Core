#!/usr/bin/env python3
"""Standalone, strict, model-only PyTorch JSON interpreter. No API/frontend code."""
import argparse,json,sys
from pathlib import Path
import numpy as np
import torch
from torch import nn
BASE=Path(__file__).resolve().parent

def predict(model_name, measurements, output_path=None):
    catalog=json.loads((BASE/'catalog.json').read_text(encoding='utf-8'))
    if model_name not in catalog:raise ValueError(f'Unknown model: {model_name}. Available: {list(catalog)}')
    item=catalog[model_name]
    if item['status']!='TRAINED_PROTOTYPE':raise ValueError(f'Model {model_name} unavailable: {item["reason"]}')
    checkpoint=torch.load(BASE/item['model_path'],map_location='cpu',weights_only=False)
    m=checkpoint['metadata']; required=m['features']
    if not isinstance(measurements,dict):raise TypeError('JSON input must be an object mapping measurement names to numeric values')
    missing=[k for k in required if k not in measurements];extra=[k for k in measurements if k not in required]
    if missing or extra:raise ValueError(f'Input feature mismatch; missing={missing}; extra={extra}. Expected exactly: {required}')
    try:
        raw=np.array([float(measurements[k]) for k in required],dtype=np.float32)
        if not np.isfinite(raw).all():raise ValueError('All values must be finite')
    except (TypeError,ValueError) as e:raise ValueError(f'Invalid measurement: {e}')
    net=nn.Sequential(nn.Linear(len(required),32),nn.ReLU(),nn.Linear(32,32),nn.ReLU(),nn.Linear(32,len(m['classes'])))
    net.load_state_dict(checkpoint['state_dict']);net.eval()
    arr=np.clip((raw-np.asarray(m['mean'],dtype=np.float32))/np.asarray(m['std'],dtype=np.float32),-15,15)
    with torch.inference_mode():
        logits=net(torch.from_numpy(arr).unsqueeze(0)).squeeze(0)
        if m.get('target_mode')=='multilabel_sigmoid':
            probs=torch.sigmoid(logits)
            picked=[i for i,prob in enumerate(probs) if float(prob)>=float(m.get('threshold',0.5))]
            if not picked:picked=[int(probs.argmax())]
            labels=[m['classes'][i] for i in picked]
            score=float(probs[picked[0]])
        else:
            probs=torch.softmax(logits,dim=0)
            idx=int(probs.argmax());score=float(probs[idx]);labels=[m['classes'][idx]]
    result={'model':model_name,'status':'PREDICTED_PROTOTYPE','measurements':{k:measurements[k] for k in required},'predicted_labels':labels,'model_score_not_clinical_probability':score,'limitations':'Prototype trained on supplied synthetic/rule-labeled data; not clinically validated'}
    if output_path:
        out=Path(output_path);out.parent.mkdir(parents=True,exist_ok=True)
        out.write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding='utf-8')
    return result

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--model',required=True);p.add_argument('--input',required=True);p.add_argument('--output',required=True)
    args=p.parse_args()
    try:
        data=json.loads(Path(args.input).read_text(encoding='utf-8'))
        print(json.dumps(predict(args.model,data,args.output),indent=2,ensure_ascii=False))
    except Exception as exc:print(f'ERROR: {exc}',file=sys.stderr);sys.exit(1)
