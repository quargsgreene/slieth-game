const fetchNode = async (node) => {
    try {
        const response = await fetch('/api/gameNode', {
            method: 'GET',
            body: JSON.stringify(node)
        })

        const json = await response.json();
        console.log('Fetch game node: ', json);
        return json;

    } catch (error) {
        console.error('Error fetching node: ', error);
        throw error;
    }
}

export default fetchNode;