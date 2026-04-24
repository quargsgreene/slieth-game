const fetchDefaultGameNodes = async () => {
    try {
        const response = await fetch('/api/gameNodes');
        if (!response.ok) {
            throw new Error(`Failed to fetch game nodes: ${response.status}`);
        }
        const json = await response.json();
        console.log('Fetched game nodes:', json);
        return json;
    } catch (error) {
        console.error('Error fetching game nodes:', error);
        throw error;
    }
}

export default fetchDefaultGameNodes;