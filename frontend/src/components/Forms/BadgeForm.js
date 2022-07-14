import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, LinearProgress } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"
import CustomStepper from "../Blocks/CustomStepper"

const BadgeForm = (props) => {
    let navigate = useNavigate();

    const { badgeData, setBadgeData, setStage, badgeId, setBadgeId } = props;

    const [badgeName, setBadgeName] = useState('Badge Name');
    const [badgeDesc, setBadgeDesc] = useState('Description of the Badge');
    const [badgeImgFile, setBadgeImgFile] = useState(null);

    const fileInput = useRef();

    const selectImage = (event) => {
        setBadgeImgFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setBadgeName(event.target.value)
    }

    const handleDescChange = (event) => {
        setBadgeDesc(event.target.value)
    }

    const handleNext = () => {
        const badge = {
            'name': badgeName,
            'desc': badgeDesc,
            'imgFile': badgeImgFile
        }
        
        setBadgeData((badgeData) => [...badgeData, badge])
        setStage('finalizeSet')
        window.scrollTo(0, 0);
    }

    const handleBack = () => {
        setStage('createSet')
        window.scrollTo(0,0)
    }

    const handleNewBadgeForm = () => {
        const badge = {
            'name': badgeName,
            'desc': badgeDesc,
            'imgFile': badgeImgFile
        }

        setBadgeData((badgeData) => [...badgeData, badge])
        setBadgeId((badgeId) => badgeId+1);
        window.scrollTo(0,0)
    }

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={1} />
            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                CREATE BADGES
            </Typography>
            <Divider 
                sx={{
                    mx: 'auto',
                    mb:'15px', 
                    width: '50%',
                    height: '3px'
                }}
            />

            <Typography variant="body1" sx={{mb:'30px', mx:'20%', textAlign: 'center'}}>
                Badges are the individual tokens that can be sent to the members of your organization.
                The Badge is the role, award, or contribution that you want to represent on-chain. Before minting,
                each Badge Type has to be set in the contract.
            </Typography>

            <Grid container rowSpacing={{sm:3, md:4, lg:5}} columnSpacing={{sm:0, md:3, lg:5}} sx={{textAlign: 'left'}}>
                <Grid item sm={0} md={1} lg={2} />
                <Grid item sm={12} md={5} lg={4}>
                    <BigBox>
                        <FormControl sx={{width: '100%', margin:'auto', my:'20px', alignItems:'center'}}>
                            <TextField 
                                label="Badge Name"
                                onChange={handleNameChange}
                                sx={{width: '90%'}}
                                color='info'
                            />
                            
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Name for the Badge
                                </FormHelperText>
                            </Box>
                        </FormControl>
                        <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
                            <TextField 
                                multiline
                                rows={10}
                                label="Badge Description"
                                onChange={handleDescChange}
                                sx={{width: '90%'}}
                                color='info'
                            />
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Description of the Badge
                                </FormHelperText>
                            </Box>
                        </FormControl>

                        <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
                            <label htmlFor="contained-button-file" style={{width: '90%'}}>
                                <Input 
                                    sx={{display: 'none'}} 
                                    ref={fileInput}
                                    accept="image/*" 
                                    id="contained-button-file" 
                                    multiple type="file" 
                                    onChange={selectImage}
                                />
                                <Button 
                                    sx={{width: '100%', margin:'auto', borderStyle: 'dashed'}}
                                    variant='outlined'
                                    onClick={() => fileInput.current.click()}
                                >
                                    <Typography variant="body1" sx={{alignSelf: 'baseline'}}>
                                        {badgeImgFile ? badgeImgFile.name : 'Upload Image'}
                                    </Typography>
                                </Button>
                                <FormHelperText>
                                    Image for the Badge token
                                </FormHelperText>
                            </label>
                        </FormControl>
                    </BigBox>
                </Grid>

                <Grid item sm={12} md={5} lg={4}>
                    <BigBox>
                        <CollectionCard
                            name={badgeName}
                            description={badgeDesc}
                            badgeImgFile={badgeImgFile}
                        />
                    </BigBox>
                </Grid>
                <Grid item sm={0} md={1} lg={2} />

                {/* Row 2 for Buttons */}
                <Grid item sm={0} md={1} lg={2} />
                <Grid item sm={3} md={2} lg={2}>
                    <Button
                        variant="contained"
                        disabled={false}
                        onClick={() => handleBack()}
                    >
                        BACK
                    </Button>
                </Grid>
                <Grid item sm={1} md={1} lg={1} />

                <Grid item sm={4} md={4} lg={2}>
                {!badgeName || !badgeDesc || !badgeImgFile ?
                        <Button
                            variant="contained"
                            disabled={true}
                            onClick={() => handleNewBadgeForm()}
                        >
                            CREATE ANOTHER
                        </Button>
                        :
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleNewBadgeForm()}
                        >
                            CREATE ANOTHER
                        </Button>
                    }
                </Grid>
                <Grid item sm={1} md={1} lg={1} />

                <Grid item sm={3} md={2} lg={2}>
                    {!badgeName || !badgeDesc || !badgeImgFile ?
                        <Button
                            variant="contained"
                            disabled={true}
                            onClick={() => handleNext()}
                        >
                            NEXT
                        </Button>
                        :
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleNext()}
                        >
                            NEXT
                        </Button>
                    }
                </Grid>
                <Grid item sm={0} md={1} lg={2} />
            </Grid>

            <Box sx={{pt:'100px'}} />
        </div>
    )
}

export default BadgeForm;