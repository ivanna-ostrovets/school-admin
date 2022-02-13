import React from 'react';
import { updateTalent } from '../../api/talentsApi';
import TalentForm from './TalentForm';
import { useFetchTalent } from './useFetchTalent';

function EditTalent() {
  const [talent] = useFetchTalent();

  return <TalentForm talent={talent} saveTalent={updateTalent} />;
}

export default EditTalent;
