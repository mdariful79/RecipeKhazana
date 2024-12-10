import ReactMarkdown from "react-markdown"

export default function ChefRecipe(props) {
    return (
        <ReactMarkdown>
            {props.recipe}
        </ReactMarkdown>
    )
}