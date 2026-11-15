

import pandas as pd

# Read the dataset
df = pd.read_csv(r"C:\Users\ascom\Desktop\Downloads\daily_cbc_dataset_50.csv.xls")
# Sort data by date
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')

# Medical columns
columns = ['wbc', 'rbc', 'hgb', 'hct', 'plt']

# Calculate daily change
for col in columns:
    df[col + '_change'] = df[col].diff()

# Display results
print(df.head(10))

# Save the new dataset
df.to_csv("daily_cbc_with_changes.csv", index=False)
print("Dataset shape:", df.shape)

print("Missing values:")
print(df.isnull().sum())
print(df['date'].diff().value_counts())
df.to_csv("daily_cbc_with_changes.csv", index=False)