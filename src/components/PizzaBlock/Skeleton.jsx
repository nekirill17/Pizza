import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="131" cy="129" r="125" /> 
    <rect x="-3" y="279" rx="6" ry="6" width="280" height="26" /> 
    <rect x="1" y="325" rx="13" ry="13" width="275" height="80" /> 
    <rect x="125" y="417" rx="24" ry="24" width="151" height="45" /> 
    <rect x="8" y="428" rx="0" ry="0" width="90" height="27" />
  </ContentLoader>
)

export default Skeleton