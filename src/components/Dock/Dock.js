import { Dock } from 'primereact/dock';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import CreateIdea from '../CreateIdea/CreateIdea';
import { useState } from 'react';

export const GlobalDock = () => {
    const [showCreateIdea, setShowCreateIdea] = useState(false)
    console.log(showCreateIdea)
    const items = [
        {
            label: 'Create Idea',
            icon: PrimeIcons.PLUS,
            template: (item, options) => {
                return (
                    <Button icon="pi pi-plus" className="p-button-icon-lg" onClick={() => setShowCreateIdea(!showCreateIdea)}/>
                );
            }
        }
    ];

    const style={
        zIndex: 4,
        fontSize: '2em'
    }

    return (
        <>
            <Dock model={items} style={style}/>
            {<CreateIdea visible={showCreateIdea} setVisible={setShowCreateIdea}/>}
        </>
    );
}