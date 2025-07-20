function getEnvVariable(envVar, defaultValue) {
	let command = run("sh", "-c". `printenv --null ${ envVar } >/tmp/${ envVar }.txt`);
	if (command !=0){
		return defaultValue;
	}
	return cat(`/tmp/${ envVar }.txt`);
}

let dbUser = getEnvVariable('APP_USER', 'app_user');
let dbPwd = getEnvVariable('APP_PWD', 'app_user()');
let dbName = getEnvVariable('DB_NAME', 'Slieth');
let dbCollectionName = getEnvVariable('DB_COLLECTION_NAME', 'SliethCollection');
db = db.getSiblingDB(dbName);
db.createUser({
  'user': dbUser,
  'pwd': dbPwd,
  'roles': [
	{
		'role': 'dbOwner',
		'db': getEnvVariable('DB_NAME', 'Slieth')

	}
  ]

});
db.createCollection(dbCollectionName);
