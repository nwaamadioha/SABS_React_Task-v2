const db = {
  users: [
    {
      id: () => Math.random() + '', // '0.0866002857510133' 
      firstName: "Emmanuel",
      lastName: "Andrew"
    },
    {
      id: () => Math.random() + '', // '0.6741289962824673'
      firstName: "Sam",
      lastName: "James"
    }
  ]
};

export default db;