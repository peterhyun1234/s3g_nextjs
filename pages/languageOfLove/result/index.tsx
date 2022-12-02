import { useEffect, useState } from 'react';
import Head from 'next/head'
import Styled from 'styled-components'
import { useRouter } from 'next/router'

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { AppBar } from '@mui/material';

const LanguageOfLoveResult = () => {
  const theme = useTheme();
  const router = useRouter()

  const [activeStep, setActiveStep] = useState(0);
  const [translateTo, setTranslateTo] = useState('');
  const [resultInfo, setResultInfo] = useState<any>(null);

  const handleTranslateToChange = (event: SelectChangeEvent) => {
    setTranslateTo(event.target.value as string);
  }

  useEffect(() => {
    if (router.query !== undefined && router.query !== null) {
      if (router.query.resultInfo !== undefined && router.query.resultInfo !== null) {
        setResultInfo(router.query.resultInfo)
      }
    }
  }, [router.query])

  return (
    <div>
      <Head>
        <title>사랑의 언어</title>
        <meta name="description" content="사랑의 언어" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBarDiv>
        <AppBarDetailDiv>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back()
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <AppBarTitle>사랑의 언어 결과</AppBarTitle>
          <TranslateToSelectDiv>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel>Translate to</InputLabel>
              <Select
                value={translateTo}
                label="Translate to"
                onChange={handleTranslateToChange}
              >
                <MenuItem value={'english'}>English</MenuItem>
                <MenuItem value={'korean'}>Korean</MenuItem>
              </Select>
            </FormControl>
          </TranslateToSelectDiv>
        </AppBarDetailDiv>
      </AppBarDiv>
      <WrapBox>
        <h1>사랑의 언어 결과 페이지 준비중</h1>
        <h1>{resultInfo}</h1>
      </WrapBox>
    </div>
  )
}

const WrapBox = Styled.div`
  max-width: 1000px;
  width: 100%;
  display: inline-block;
  padding-top: 56px;
`
const AppBarDiv = Styled.div`
  border-bottom: 1px solid #EBEBEB;
  background-color: #ffffff;
  height: 59px;
  display: table;
  width: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 5;
`
const AppBarDetailDiv = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 32px);
  margin-top: 6px;
  margin-right: 16px;
  margin-left: 16px;
`
const AppBarTitle = Styled.div`
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
`
const TranslateToSelectDiv = Styled.div`
  width: 140px;
`
const SelectDiv = Styled.div`
  padding: 16px;
`
const QuestionSelectDiv = Styled.div`
  background-color: ${(props: { isSelected?: any; }) => props.isSelected ? "#327bff" : "#fff"};
  color: ${(props: { isSelected?: any; }) => props.isSelected ? "#fff" : "#327bff"};
  margin-bottom: 25px;
  padding: 15px 10px;
  border-radius: 10px;
  border: solid 1px #327bff;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
  text-align: center;
  word-break: keep-all;
  white-space: break-spaces;
`
const StepperBottomButtonDiv = Styled.div`
  width: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 4;
  bottom: 0;
  cursor: pointer;
  padding: 0px 0px calc(constant(safe-area-inset-bottom));
  padding: 0px 0px calc(env(safe-area-inset-bottom));
`

export default LanguageOfLoveResult;