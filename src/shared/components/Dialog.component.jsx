import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from './Button.component';
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BtnContainer = styled.div `
    width: 80%; 
    padding-top: 24px;
`

const BasicModal = ({title, bodyText, open, setOpen, navigationFunction}) => {

  const handleClose = () => setOpen(false);


  return (
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
          {title}
          </Typography>
          <Typography sx={{ mt: 2 }}>
         {bodyText}
          </Typography>
          <BtnContainer>
          <Button handleClick={navigationFunction} name='Back to Library' /> 
          </BtnContainer>
        </Box>
      </Modal>
  );
};

export default BasicModal; 