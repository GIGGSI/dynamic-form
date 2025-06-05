import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import type { FormSchema, GroupFieldType } from '../../types/form';
import FormRenderer from '../FormRenderer';
import { fetchCompanyList } from '../../api/mockApi';

type Props = {
  field: GroupFieldType;
  value?: Record<string, any>;
  onChange: (name: string, value: any) => void;
  allValues: Record<string, any>;
};

export default function FormGroup({ field, value = {}, onChange, allValues }: Props) {
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [companyMap, setCompanyMap] = useState<Record<string, string>>({});
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  const handleGroupChange = (groupData: Record<string, any>) => {
    const selectedCompany = groupData.companyName;
    if (selectedCompany && companyMap[selectedCompany]) {
      groupData.companyEIK = companyMap[selectedCompany];
    }
    onChange(field.name, groupData);
  };

  useEffect(() => {
    if (allValues.userType === 'BUSINESS') {
      setLoadingCompanies(true);

      fetchCompanyList()
        .then((companies) => {
          setCompanyOptions(companies.map((c) => c.name));

          const map = companies.reduce((acc, c) => {
            acc[c.name] = c.eik;
            return acc;
          }, {} as Record<string, string>);

          setCompanyMap(map);
        })
        .finally(() => setLoadingCompanies(false));
    }
  }, [allValues.userType]);

  const enrichedSchema: FormSchema = {
    fields: field.fields.map((f) => {
      if (f.name === 'companyName' && f.type === 'dropdown') {
        return {
          ...f,
          options: companyOptions,
        };
      }
      return f;
    }),
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {field.label}
      </Typography>

      {loadingCompanies && (
        <Typography variant="body2" color="text.secondary">
          Loading company names...
        </Typography>
      )}

      <FormRenderer
        schema={enrichedSchema}
        onChange={handleGroupChange}
        parentValues={value}
        parentAllValues={allValues}
        disableFormWrapper
        hideSubmitButton
      />
    </Paper>
  );
}
