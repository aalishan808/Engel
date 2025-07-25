// Example: app/page.tsx or pages/index.tsx
'use client'; // For App Router
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import '../../firebase/config';
export default function HomePage() {
    return (
        <div className="p-4">
            <h1>Welcome to PrimeReact with Next.js!</h1>
            <Button label="Click Me" icon="pi pi-check" />
            <InputText></InputText>
<div className="card flex flex-wrap justify-content-center gap-3">
            <Button icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>            
        </div>

);
}
    