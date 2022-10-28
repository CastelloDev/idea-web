// import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Card } from "primereact/card";

function Idea({ data }) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <Card title={data.title}>
      <Handle type="target" position={Position.Top} />
      <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </Card>
  );
}

export default Idea;
