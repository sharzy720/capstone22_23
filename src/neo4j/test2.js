(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://d0a1241d.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'WCUCapstone2022';
    const timeStep = 4;
    const fs = require('fs')
    let idFile;
    let transactionFile;

    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

    try {
        idFile = fs.openSync('../JSONFiles/ids_test.json', 'w');
        transactionFile = fs.openSync('test.json', 'w');
        await getUserIds(driver);
        // await getSourceIds(driver);
        // await getTargetIds(driver);

        // await findPerson(driver, person2Name);
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }

    /**
     * Gets ids of the users in the database
     * @param driver neo4j driver for running a query
     * @returns {Promise<void>}
     */
    async function getUserIds(driver) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = 'MATCH p = (S:source)-[* {\`time step\`:' + timeStep + '}]-(T:target) RETURN S.name, T.name';

            const readResult = await session.readTransaction(tx =>
                tx.run(readQuery)
            );

            // console.log(readResult.records.toLocaleString())

            // TODO create array of all user ids including duplicate ids
            let userIDS = []

            writeToFile(transactionFile, "[\n")

            console.log("length of result" + readResult.records.length)

            readResult.records.forEach(record => {
                // const test = record.get('n')
                console.log(`Source ID: ${record.get('S.name')} ----> Target ID: ${record.get('T.name')}`)

                let sourceID = record.get('S.name');
                let targetID = record.get('T.name');

                // TODO create json of transactions (source, target)
                appendToFile(transactionFile, "{ \"source\": " + sourceID + ", \"target\": " + targetID + " },\n")

            });

            appendToFile(transactionFile, "]")
            // TODO remove duplicate user ids


            // TODO create json of user ids (name)


        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    /**
     * Overwrites a given file with the given message
     * @param message String to overwrite file with
     */
    function writeToFile(file, message) {
        fs.writeFile(file, message, (err) => {
            if (err) throw err;
            else{
                console.log("The file is updated with the given data")
            }
        })
    }

    /**
     * Appends a given file with the given message
     * @param file File to append a String to
     * @param message String to append to a file
     */
    function appendToFile(file, message) {
        fs.appendFile(file, message, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

})();
