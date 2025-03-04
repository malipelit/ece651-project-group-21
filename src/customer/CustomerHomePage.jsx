import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function CustomerHomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/restaurants')
            .then(response => setRestaurants(response.data.restaurants))
            .catch(error => console.error("Error fetching restaurants:", error));
    }, []);

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container my-4">
            <header className="py-3 mb-4" style={{ backgroundColor: '#ffc107' }}>
                <h1 className="text-center text-dark">Restaurants</h1>
            </header>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="form-control"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="list-group">
                {filteredRestaurants.map(r => (
                    <Link key={r.id} to={`/restaurant/${r.id}`} className="list-group-item list-group-item-action">
                        <h5>{r.name}</h5>
                        <p className="mb-1">{r.location}</p>
                        <small>{r.cuisine}</small>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CustomerHomePage;