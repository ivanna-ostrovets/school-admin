import React from 'react';
import { editTalent } from '../../api/talentsApi';
import TalentForm from './TalentForm';
import { useFetchTalent } from './useFetchTalent';

function EditTalent() {
  const [talent] = useFetchTalent();

  return <TalentForm talent={talent} saveTalent={editTalent} />;
}

export default EditTalent;
