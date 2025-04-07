import { useState } from 'react';

const InputCreate = ({ addNewTask }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setTitle(e.target.value);
        setError(''); // Limpiar el error al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setError('Please enter a title');
            return;
        }

        const payload = { title };
        try {
            const response = await fetch('http://localhost:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const newTask = await response.json();
                addNewTask(newTask); // Llama a la función para agregar la nueva tarea
                setTitle(''); // Limpia el campo de entrada
                setSuccessMessage('Item created successfully!');
                setError(''); // Limpiar errores previos
            } else {
                setError('Error creating item');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error creating item');
        }
    };

    return (
        <div>
            <h2>Create Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter title"
                />
                <button type="submit">Create</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default InputCreate;
