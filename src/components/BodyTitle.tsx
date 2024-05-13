type BodyTitleProps = {
  title: string
}
export const BodyTitle = () => {
  return (
    <h1 className="text-lg text-white p-4 m-0 text-center font-bold">
      we will recommend a <span className={"text-highlightColor"}>game</span> that
      you can ply with your <span className={"text-highlightColor"}>friends</span>!
    </h1>
  )
}
