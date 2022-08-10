import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { Editor } from 'primereact/editor';
import { createIdea } from '../../services/IdeaService';

export default function CreateIdea(props) {
    const {visible, setVisible} = props
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const footer = (
        <div>
            <Button label="Create" onClick={() => createIdea({title, description}) && setVisible(false)} />
        </div>
    );

    return (
        <Dialog header="Create An Idea" footer={footer} visible={visible} onHide={()=>setVisible(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
            <div className="grid p-fluid">
                <div className="col-12 lg:col-8 gap-4">
                    <label className="text-xl">Title</label>
                    <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className="text-xl">Description</label>
                    <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setDescription(e.htmlValue)} />
                </div>
            </div>
        </Dialog>
    )
}
