#!/usr/bin/env python3
"""Run each trained specialist with its own exact example JSON. No API or frontend."""
import json
from pathlib import Path
from interpreter import predict
BASE=Path(__file__).resolve().parent
catalog=json.loads((BASE/'catalog.json').read_text(encoding='utf-8'))
for name,info in catalog.items():
 if info['status']!='TRAINED_PROTOTYPE':
  print(name,': BLOCKED —',info['reason']);continue
 measurements=json.loads((BASE/'examples'/f'{name}_input.json').read_text(encoding='utf-8'))
 result=predict(name,measurements,BASE/'json_outputs'/f'{name}.json')
 print(name,':',result['predicted_labels'])
