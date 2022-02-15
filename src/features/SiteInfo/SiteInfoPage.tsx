import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useReducer } from 'react';
import { fetchSiteInfo, updateSiteInfo } from '../../api/siteInfoApi';
import ElevationScroll from '../../components/ElevationScroll';
import TextFieldWithDeleteAction from '../../components/TextFieldWithDeleteAction';
import { Hotline } from '../../types';
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
        <Typography variant="subtitle1">Номер телефону</Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            dispatch({
              type: SiteInfoActionType.AddPhoneNumber,
              payload: '',
            })
          }
        >
          Додати
        </Button>
      </Box>

      {state.phoneNumbers.map((number, index) => (
        <TextFieldWithDeleteAction
          key={`phone-number-${index}`}
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

      <Divider sx={{ my: 3, mx: -3 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1">Email</Typography>

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
          Додати
        </Button>
      </Box>

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

      <Divider sx={{ my: 3, mx: -3 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1">Гарячі лінії</Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            dispatch({
              type: SiteInfoActionType.AddHotline,
              payload: {} as Hotline,
            })
          }
        >
          Додати
        </Button>
      </Box>

      {state.hotlines.map((hotline, index) => (
        <Box
          key={`hotline-${index}`}
          mb={2}
          gap={2}
          display="flex"
          alignItems="center"
        >
          <TextField
            fullWidth
            label="Назва"
            variant="outlined"
            value={hotline.title}
            onChange={e =>
              dispatch({
                type: SiteInfoActionType.UpdateHotline,
                hotline: { ...hotline, title: e.target.value },
                index,
              })
            }
          />

          <TextField
            label="Стаціонарний номер"
            variant="outlined"
            value={hotline.landlineNumber}
            sx={{ minWidth: 200 }}
            onChange={e =>
              dispatch({
                type: SiteInfoActionType.UpdateHotline,
                hotline: { ...hotline, landlineNumber: e.target.value },
                index,
              })
            }
          />

          <TextField
            label="Мобільний номер"
            variant="outlined"
            value={hotline.mobileNumber}
            sx={{ minWidth: 200 }}
            onChange={e =>
              dispatch({
                type: SiteInfoActionType.UpdateHotline,
                hotline: { ...hotline, mobileNumber: e.target.value },
                index,
              })
            }
          />

          <IconButton
            onClick={() =>
              dispatch({ type: SiteInfoActionType.DeleteHotline, index })
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default SiteInfoPage;
