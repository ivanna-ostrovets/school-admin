import React from 'react';
import { editTalent } from '../../api/talentsApi';
import TalentForm from './TalentForm';
import { useTalent } from './useTalent';

function EditTalent() {
  const [talent] = useTalent();

  return <TalentForm talent={talent} saveTalent={editTalent} />;
}

export default EditTalent;
