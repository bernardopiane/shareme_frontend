import React, { useState, useEffect } from 'react'
// Import useparams
import { useParams } from 'react-router-dom'

// Import client
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data';

import MasonryLayout from "./MasonryLayout";
import Spinner from './Spinner';

function Feed() {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        if (categoryId) {
            // Fetch category pin
            const query = searchQuery(categoryId);
            client.fetch(query).then(data => {
                console.log(data);
                setPins(data);
                setLoading(false);
            });
        } else {
            // Fetch all pins
            client.fetch(feedQuery).then(data => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);


    // If loading return a spinner
    if (loading) return <Spinner message="We are adding new ideas to your feed!" />

    if(!pins?.length) return <h2>No pins available</h2>

    return (
        <div>
            {pins && (
                <MasonryLayout pins={pins} />
            )}
        </div>
    )
}

export default Feed
