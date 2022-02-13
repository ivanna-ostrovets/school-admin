import React from 'react';
import { addTalent } from '../../api/talentsApi';
import TalentForm from './TalentForm';

function CreateTalent() {
  return <TalentForm saveTalent={addTalent} />;
}

export default CreateTalent;
