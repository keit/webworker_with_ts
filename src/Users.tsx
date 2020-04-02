import React, { useEffect, useState } from "react";
import { User } from './utils/userDB'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UsersQueryWorker from "worker-loader?name=static/[hash].worker.js!../src/workers/usersQuery.worker";

let worker: UsersQueryWorker;

export const Users: React.FC = () => {
    // construct worker when component is mounted
    useEffect(() => {
        worker = new UsersQueryWorker();
        return () => worker.terminate();
    }, []);

    const [users, setUsers] = useState<User[]>([]);

    const onWorkerMessage = (event: { data: any }) => {
      const res: User[] = event.data.output;
      setUsers(res)
      console.log("Received from woker", event.data.output);
    };

    const callWorker = () => {
        worker.onmessage = onWorkerMessage;
        worker.postMessage({name: 'kei'});
    };

    return (
      <div>
        <h1>WebWorker Test</h1>
        <table>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={callWorker}>Call WebWorker</button>
      </div>
    );
}
