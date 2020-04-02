import React from "react";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MyWorker from "worker-loader?name=static/[hash].worker.js!../src/workers/example.worker";

let worker: MyWorker;


export const Users: React.FC = () => {
    // construct worker when component is mounted
    React.useEffect(() => {
        worker = new MyWorker();
        return () => worker.terminate();
    }, []);

    const onWorkerMessage = (event: { data: number }) => {
      console.log("Received from woker", event.data);
    };

    const callWorker = () => {
        worker.onmessage = onWorkerMessage;
        worker.postMessage(33);
    };

    return (
      <div>
        <h1>WebWorker Test</h1>
        <button onClick={callWorker}>Call WebWorker</button>
      </div>
    );
}
