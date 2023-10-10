export default function Desktop() {
  return (
    <div className="grid grid-cols-12">
      <Cell />
    </div>
  );
}

function Cell() {
  return <h4>Cell</h4>;
}
