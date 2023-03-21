import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ChangeEvent, FC } from "react";
import { ApikeyAtom } from "../atoms";

const ApikeyInput: FC = () => {
  const [apiKey, setApiKey] = useAtom(ApikeyAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel>APIキー</FormLabel>
      <Input
        type="text"
        value={apiKey}
        placeholder="please enter API key"
        onChange={handleChange}
        size={"sm"}
      />
      <FormHelperText>
        <Link href="https://platform.openai.com/account/api-keys">
          OpenAIのプラットフォーム
        </Link>
        から発行したAPIキーを入力してください
      </FormHelperText>
    </FormControl>
  );
};

export default ApikeyInput;
