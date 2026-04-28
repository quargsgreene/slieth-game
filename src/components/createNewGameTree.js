//TODO: create new game tree and insert nodes into it
const createNewGameTree = async (url, newGameTree = {}) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGameTree)
        });

        if (!response.ok) {
            let message = `Failed to create game node: ${response.status}`;
            try {
                const errorBody = await response.json();
                if (errorBody?.error) {
                    message = `${message} - ${errorBody.error}`;
                }
            } catch {
                // Ignore JSON parse failures and keep status-based message.
            }
            throw new Error(message);
        }
        const json = await response.json();
        console.log('Created game node:', json);
        return json;
    } catch (error) {
        console.error('Error fetching game nodes:', error);
        throw error;
    }
}

export default createNewGameTree;