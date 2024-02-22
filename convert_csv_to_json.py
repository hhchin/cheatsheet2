'''
@file generate masterList json obj from csv file
@author chin hui han
'''
import pandas as pd
import json
import sys
import csv

def main():
  if len(sys.argv) > 1:
    csv_fn = sys.argv[1]
  else:
    csv_fn = 'master.csv'

  rm_quote = lambda x: x.replace('"', '')
  #@TODO check if this way of reading csv is robust to escape chars
  #df = pd.read_csv(csv_fn,  quotechar='\"', quoting=csv.QUOTE_ALL, sep=r",", engine="python", skipinitialspace=True)
  df = pd.read_csv(csv_fn)
  df = df.rename(columns=rm_quote)
  df.sort_values(by="shortform", inplace=True)
  df.reset_index(drop=True, inplace=True)

  def form_name(row):
    return '{} ({})'.format(rm_quote(row['longform']), rm_quote(row['shortform']))

 
 
  with open('terms.js','w') as fd:
    fd.write('const termsList = \n')
    fd.write('[\n')
    for ind, row in df.iterrows():
      
      shortform_str = row['shortform']
      name_str = '{} ({})'.format(rm_quote(row['longform']), rm_quote(row['shortform']))
      fd.write('{{shortform: \"{}\", longform: \"{}\"}}'.format(shortform_str, name_str))
      

      if ind < len(df)-1:
        fd.write(',\n')
    fd.write(']\n')
  

if __name__ == '__main__':
  main()