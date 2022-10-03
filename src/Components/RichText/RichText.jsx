import JoditEditor from "jodit-react";
import { useRef } from "react";
const RichText = ({ setRichData }) => {
    const config = {
        "spellcheck": true,
        "toolbarSticky": false,
        "showCharsCounter": false,
        "showWordsCounter": false,
        "showXPathInStatusbar": false,
        "toolbarInlineForSelection": true,
        "showPlaceholder": false,
        "height": 400,
    }
    const editor = useRef(null);
    return (
        <JoditEditor onBlur={content => setRichData(content)} ref={editor} config={config}/>
    )
}
export default RichText;