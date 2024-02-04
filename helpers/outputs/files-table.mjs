export const printTable = (data) => {
    const {directories, files} = data;
    const printData = [...directories.sort().map(d => ({Name: d, Type: 'directory'})), ...files.sort().map(f => ({
        Name: f,
        Type: 'file'
    }))];

    console.table(printData);
};