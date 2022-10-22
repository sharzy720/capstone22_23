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
        idFile = fs.openSync('test_ids.json', 'w');
        transactionFile = fs.openSync('test.json', 'w');
        await receiveDatabaseData(driver);

        // await findPerson(driver, person2Name);
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }


    /**
     * Receives transaction ids from given time step, parses transaction json
     * @param driver neo4j driver for running a query
     * @returns {Promise<void>}
     */
    async function receiveDatabaseData(driver) {

        const session = driver.session({ database: 'neo4j' });

        // TODO create array of all user ids including duplicate ids
        let userIDS = []

        try {
            const readQuery = 'MATCH p = (S:source)-[* {\`time step\`:' + timeStep + '}]-(T:target) RETURN S.name, T.name';

            const readResult = await session.readTransaction(tx =>
                tx.run(readQuery)
            );


            // Create json file of transactions (source, target)
            writeToFile(transactionFile, "[\n")

            console.log("length of result" + readResult.records.length)

            for await (const record of readResult.records) {
                // console.log(`Source ID: ${record.get('S.name')} ----> Target ID: ${record.get('T.name')}`)

                // Recording all user ids that were either the source or target of a transaction
                let sourceID = record.get('S.name');
                userIDS.push(sourceID.toString());

                let targetID = record.get('T.name');
                userIDS.push(targetID.toString());

                // Appends source and target ids to the transaction json file
                appendToFile(transactionFile, "{ \"source\": " + sourceID + ", \"target\": " + targetID + " },\n")

            }

            // readResult.records.forEach(record => {
            //     // const test = record.get('n')
            //     console.log(`Source ID: ${record.get('S.name')} ----> Target ID: ${record.get('T.name')}`)
            //
            //     let sourceID = record.get('S.name');
            //     userIDS.push(sourceID);
            //
            //     let targetID = record.get('T.name');
            //     userIDS.push(targetID);
            //
            //     appendToFile(transactionFile, "{ \"source\": " + sourceID + ", \"target\": " + targetID + " },\n")
            //
            // });
            appendToFile(transactionFile, "]")
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }

        await createUserIdJson(userIDS)
    }


    /**
     * Creates a json file for all unique user ids that had transactions
     * @param ids List of user ids
     * @returns {Promise<void>}
     */
    async function createUserIdJson(ids) {
        // Remove duplicate user ids

        // Different ways to remove duplicate IDS choose one
        // userIDS = [...new Set(userIDS)];
        // let userIds = ids.reduce((p, c) => p.set(c.a, c), new Map()).values()
        // let userIds = [...new Set(ids)]
        // let userIds = ids.filter((element, index) => {
        //     return ids.indexOf(element) === index;
        // });
        let userIds = []
        ids.forEach((c) => {
            if (!userIds.includes(c)) {
                userIds.push(c);
            }
        });


        // Create json of user ids (name)
        writeToFile(idFile, "[\n")

        for await (const id of userIds) {
            appendToFile(idFile, "{ \"name\": " + id + " },\n");
        }

        // Timeout so closing bracket is written to end of json and not the middle
        setTimeout(() => {  appendToFile(idFile, "]"); }, 0);
    }


    /**
     * Overwrites a given file with the given message
     * @param file File to overwrite
     * @param message String to overwrite file with
     */
    function writeToFile(file, message) {
        fs.writeFile(file, message, (err) => {
            if (err) throw err;
            else{
                // console.log(file + ' has been reset with ' + message)
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
            // console.log('Appended ' + message + ' to ' + file);
        });
    }

})();
