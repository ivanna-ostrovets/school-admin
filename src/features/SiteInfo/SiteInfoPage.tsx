import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useReducer } from 'react';
import { fetchSiteInfo, updateSiteInfo } from '../../api/siteInfoApi';
import ElevationScroll from '../../components/ElevationScroll';
import TextFieldWithDeleteAction from '../../components/TextFieldWithDeleteAction';
import {
  SiteInfoActionType,
  siteInfoInitialState,
  siteInfoReducer,
} from './siteInfoReducer';

function SiteInfoPage() {
  const [state, dispatch] = useReducer(siteInfoReducer, siteInfoInitialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({
        type: SiteInfoActionType.AddAll,
        payload: await fetchSiteInfo(),
      });
    }

    fetchData();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateSiteInfo(state)}
        >
          Зберегти
        </Button>
      </ElevationScroll>

      <Typography variant="subtitle1" mb={2}>
        Назва школи
      </Typography>

      <TextField
        label="Скорочена назва школи"
        variant="outlined"
        sx={{ mb: 2 }}
        value={state.shortName}
        onChange={e =>
          dispatch({
            type: SiteInfoActionType.AddShortName,
            payload: e.target.value,
          })
        }
      />

      <TextField
        label="Повна назва школи"
        variant="outlined"
        value={state.fullName}
        onChange={e =>
          dispatch({
            type: SiteInfoActionType.AddFullName,
            payload: e.target.value,
          })
        }
      />

      <Divider sx={{ my: 3, mx: -3 }} />

      <Typography variant="subtitle1" mb={2}>
        Соціальні мережі
      </Typography>

      <TextField
        label="Посилання на Facebook"
        variant="outlined"
        sx={{ mb: 2 }}
        value={state.facebookLink}
        onChange={e =>
          dispatch({
            type: SiteInfoActionType.AddFacebookLink,
            payload: e.target.value,
          })
        }
      />

      <TextField
        label="Посилання на YouTube"
        variant="outlined"
        value={state.youtubeLink}
        onChange={e =>
          dispatch({
            type: SiteInfoActionType.AddYouTubeLink,
            payload: e.target.value,
          })
        }
      />

      <Divider sx={{ my: 3, mx: -3 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1">Контакти</Typography>

        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch({
                type: SiteInfoActionType.AddPhoneNumber,
                payload: '',
              })
            }
          >
            Додати номер телефону
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              dispatch({
                type: SiteInfoActionType.AddEmail,
                payload: '',
              })
            }
          >
            Додати Email
          </Button>
        </Box>
      </Box>

      {state.phoneNumbers.map((number, index) => (
        <TextFieldWithDeleteAction
          key={`phone-number-${index}`}
          label="Номер телефону"
          value={number}
          onDelete={() =>
            dispatch({
              type: SiteInfoActionType.DeletePhoneNumber,
              index,
            })
          }
          onChange={e =>
            dispatch({
              type: SiteInfoActionType.UpdatePhoneNumber,
              number: e.target.value,
              index,
            })
          }
        />
      ))}

      <Divider sx={{ mb: 2 }} />

      {state.emails.map((email, index) => (
        <TextFieldWithDeleteAction
          key={`email-${index}`}
          label="Email"
          value={email}
          onDelete={() =>
            dispatch({ type: SiteInfoActionType.DeleteEmail, index })
          }
          onChange={e =>
            dispatch({
              type: SiteInfoActionType.UpdateEmail,
              email: e.target.value,
              index,
            })
          }
        />
      ))}
    </Box>
  );
}

export default SiteInfoPage;
