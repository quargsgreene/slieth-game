import {useState, useEffect} from 'react'
import axios from 'axios'

const NodeList = () => {
    const [nodes, setNodes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchNodes = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch('/api/gameNodes')

                if(!response.ok){
                    throw new Error(`Failed to fetch game nodes: ${response.status}`)
                }

                const json = await response.json()
                setNodes(json)
            } catch (err) {
                console.error(err)
                setError('Failed to fetch game nodes')
            } finally {
                setLoading(false)
            }
        }

        fetchNodes()
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <>  {nodes && nodes.map((node) => (
            <div key={node._id}>
                <h2>{node.value}</h2>
                {node.videoUrl && <video src={node.videoUrl} controls />}
                {node.audioUrl && <audio src={node.audioUrl} controls />}
                {node.imageUrl && <img src={node.imageUrl} alt={node.value} />}
            </div>
        ))}
        </>
    );

}

export default NodeList