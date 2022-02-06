import { useEffect, useState } from 'react';
import { addPartner, fetchPartners } from '../../api/partnersApi';
import { Partners, UnsavedPartner } from '../../types';

const initialPartner = { name: '', url: '' };

export function usePartners() {
  const [partners, setPartners] = useState<Partners>({});
  const [newPartner, setNewPartner] = useState<UnsavedPartner>(initialPartner);

  useEffect(() => {
    async function fetchData() {
      setPartners(await fetchPartners());
    }

    fetchData();
  }, []);

  async function add() {
    if (!canAddPartner) return;

    const newPartnerId = await addPartner(newPartner);

    if (!newPartnerId) return;

    setNewPartner(initialPartner);
    setPartners(prevPartners => ({
      ...prevPartners,
      [newPartnerId]: {
        ...newPartner,
        id: newPartnerId,
      },
    }));
  }

  const canAddPartner = newPartner.name && newPartner.url;
  const partnersToRender = Object.values(partners);

  return {
    newPartner,
    setNewPartner,
    add,
    canAddPartner,
    partners: partnersToRender,
    setPartners,
  };
}
