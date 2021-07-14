import csvToJson from 'csvtojson/v2';

export const parseCsv = async (filePath: string): Promise<{ code: string, description: string }[]> => {
  try {
    const jsonData = await csvToJson({
      delimiter: 'auto',
      headers: ['code', 'description'],
    }).fromFile(filePath) as { code: string, description: string }[];

    return jsonData;
  } catch(error) {
    throw new Error(error);
  }

};

