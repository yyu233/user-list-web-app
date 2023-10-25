import './UserList.css';

import React, { useEffect, useState, useRef } from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import LoadinIndicator from '../LoadingIndicator/LoadingIndicator';

const URL = 'https://jsonplaceholder.typicode.com/users'
const URL2 = 'http://localhost:3333/1'

export default function UserList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    if(list.length) {
      return;
    }

    fetch(URL2)
        .then(data => data.json())
        .then(items => {
            if(mounted.current) {
                setList(items);
                setLoading(false);
            }
        })
        .catch(e => {
            setError(e);
            setLoading(false);
        })

    return () => mounted.current = false;
    
  }, [list]);

  if (loading) return <LoadinIndicator/>;
  if (error) return <ErrorDisplay/>;

  return (
    <div className="wrapper">
        <ul>
            {list.map(item => <li key={item.id}>Name:{item.name} Username:{item.username} Email:{item.email}</li>)}
        </ul>
    </div>
  );
}