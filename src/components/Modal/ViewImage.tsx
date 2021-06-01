import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" display="flex" alignItems="center">
          <ModalBody>
            <Image src={imgUrl} maxW="900px" maxH="600px" />
            <ModalFooter
              bgColor="pGray.800"
              borderBottomRadius="md"
              display="flex"
              justifyContent="flex-start"
            >
              <Link href={imgUrl} isExternal>
                Abrir original
              </Link>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
