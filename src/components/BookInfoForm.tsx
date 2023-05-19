import {
  Button,
  NumberInput,
  Stack,
  Switch,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useTableDataContext } from "../context/TableDataContext";
import { InputsFlowRef } from "../App";

interface BookInfoFormProps {
  updateTableFormData: Function;
  inputsFlowRef?: InputsFlowRef;
  submit: boolean;
  setSubmit: Function;
}

interface FormRefsType {
  SKU_1?: HTMLInputElement | null;
  SKU_2?: HTMLInputElement | null;
  SKU_3?: HTMLInputElement | null;
  shippingCost?: HTMLInputElement | null;
  price?: HTMLInputElement | null;
  condition?: HTMLInputElement | null;
  conditionNotes?: HTMLTextAreaElement | null;
}

const BookInfoForm = ({
  updateTableFormData,
  submit,
  setSubmit,
}: BookInfoFormProps) => {
  const [freeShipping, setFreeShipping] = useState(false);
  const [SKU_3, setSKU_3] = useState(0);
  const { setTableData } = useTableDataContext();

  const formRefs = useRef<FormRefsType>({});

  const handleAssign = (isAssignButton?: boolean) => {
    const formRefsValues = formRefs.current;
    const formValues = {
      SKU: {
        SKU_1: formRefsValues?.SKU_1?.value || "",
        SKU_2: formRefsValues?.SKU_2?.value || "",
        SKU_3: formRefsValues?.SKU_3?.value || "",
      },
      freeShipping: freeShipping,
      shippingCost: Number(formRefsValues?.shippingCost?.value) || 0,
      price: Number(formRefsValues?.price?.value) || 0,
      condition: formRefsValues?.condition?.value || "",
      conditionNotes: formRefsValues?.conditionNotes?.value || "",
    };

    updateTableFormData(formValues, isAssignButton);
    setSKU_3("" as any);
  };

  const changeSKU3 = (value: number) => {
    const newSKU3 = value;

    if (!isNaN(newSKU3)) {
      setTableData((prev) => ({ ...prev, lastSKU3: newSKU3 - 1 }));
      setSKU_3(newSKU3);
    }
  };

  useEffect(() => {
    if (submit === true) {
      handleAssign();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <Stack w="max-content">
      <TextInput
        ref={(ref) => (formRefs.current.SKU_1 = ref)}
        size="md"
        label="SKU (Part one)"
        placeholder="custom..."
      />
      <TextInput
        ref={(ref) => (formRefs.current.SKU_2 = ref)}
        size="md"
        label="SKU (Part two)"
        placeholder="custom..."
      />
      <NumberInput
        ref={(ref) => (formRefs.current.SKU_3 = ref)}
        value={SKU_3}
        onChange={changeSKU3}
        size="md"
        label="SKU (Part three)"
        placeholder="custom..."
      />
      <NumberInput
        ref={(ref) => {
          formRefs.current.price = ref;
        }}
        size="md"
        precision={2}
        label="Price"
        placeholder="custom..."
      />
      <Switch
        checked={freeShipping}
        onChange={(event) => setFreeShipping(event.currentTarget.checked)}
        labelPosition="left"
        label="Free shipping"
        size="md"
      />
      <NumberInput
        ref={(ref) => (formRefs.current.shippingCost = ref)}
        size="md"
        precision={2}
        label="Cost of Shipping"
        placeholder="custom..."
        disabled={freeShipping}
      />
      <TextInput
        ref={(ref) => (formRefs.current.condition = ref)}
        size="md"
        label="Condition"
        placeholder="custom..."
      />
      <Textarea
        ref={(ref) => (formRefs.current.conditionNotes = ref)}
        size="md"
        label="Condition Notes"
        placeholder="custom..."
      />
      <Button onClick={() => handleAssign(true)}>Assign</Button>
    </Stack>
  );
};

export default BookInfoForm;
