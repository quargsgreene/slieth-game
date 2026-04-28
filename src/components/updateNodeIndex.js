const updateNodeIndex = async (newIndex, id) => {
    try {
        if (!id) {
            throw new Error('Missing game tree id for node index update');
        }

        const response = await fetch(`/api/updateGameTreeState/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ currentNodeIndex: newIndex })
        });

        if(!response.ok){
            throw new Error(`Failed to update game node index: ${response.status}`)
        }

        const json = await response.json();
        console.log('Updated game node:', json);
        return json;

    } catch (error) {
        console.error("Could not update node index: ", error);
        throw error;
    }
}

export default updateNodeIndex;