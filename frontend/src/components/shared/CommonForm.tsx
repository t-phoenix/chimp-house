import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

const CommonForm = ({
  legendTitle,
  formDescription,
  isErrored = false,
  onErrorCTAClick,
  onErrorCTA = 'Retry',
  children,
}: {
  legendTitle: string;
  formDescription?: string;
  isErrored?: boolean;
  onErrorCTAClick?: () => void;
  onErrorCTA?: string;
  children: ReactNode;
}) => {
  return (
    <form>
      <fieldset className='bg-accent rounded p-8 m-4 lg:m-20'>
        <legend className='bg-secondary px-4 py-2 rounded uppercase font-bold text-2xl border-white border'>
          {legendTitle}
        </legend>

        {isErrored ? (
          <>
            <Alert variant='destructive'>
              <ExclamationTriangleIcon className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your data couldn't be fetched, try again.
              </AlertDescription>
            </Alert>
            <Button
              onClick={onErrorCTAClick}
              className='mt-4'
              variant='outline'
            >
              {onErrorCTA}
            </Button>
          </>
        ) : (
          <>
            <p className='font-medium pb-8'>{formDescription}</p>
            {children}
          </>
        )}
      </fieldset>
    </form>
  );
};

export default CommonForm;
