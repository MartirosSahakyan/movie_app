import {
    useParams
  } from "react-router-dom";

export default function MovieDetails () {
    let {id} = useParams()
    return(
        <h1>Details ID:::  {id}</h1>
    )
}