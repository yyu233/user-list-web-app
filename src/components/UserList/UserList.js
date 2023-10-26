import Table from 'react-bootstrap/Table';

import React, { useEffect, useState, useRef } from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import LoadinIndicator from '../LoadingIndicator/LoadingIndicator';

const URL = 'https://jsonplaceholder.typicode.com/users'
const URL_LOCAL = 'http://localhost:3333/1'

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

    fetch(URL_LOCAL)
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
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email Address</th>
                </tr>
            </thead>
            <tbody>
                {list.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  );
}