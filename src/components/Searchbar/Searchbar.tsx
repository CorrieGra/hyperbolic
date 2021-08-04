import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { SpinnerComponent as CustomSpinner } from 'components/Spinner/Spinner';

export function SearchbarComponent({ ...args }) {
    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                 style={{ fontSize: '1.6rem' }}
                 onChange={ args.onChange }
                 placeholder="Search by title"
                 aria-label="Search by title"
                 aria-describedby="basic-addon2"
                />
                <Button 
                variant="outline-primary" 
                id="button-addon2" 
                onClick={ args.onClick }
                style={{ width: '7rem', fontSize: '1.6rem' }}>
                    { 
                        args.isLoading ? (
                            <CustomSpinner animation="border"/>
                        ) : args.buttonText
                    }
                </Button>
            </InputGroup>
        </>
    );
};