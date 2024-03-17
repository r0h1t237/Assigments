import React, { useState, useRef } from 'react';
import './App.css';
import { Container, Heading, Card, SimpleGrid, GridItem, FormControl, FormLabel, InputGroup, InputLeftElement, Input, InputRightElement, Icon, Flex, Button, Text, FormErrorMessage,  } from '@chakra-ui/react';
import { Select, chakraComponents, OptionBase } from "chakra-react-select";
import { SpinnerIcon,CheckIcon,TriangleDownIcon,CloseIcon,AddIcon} from '@chakra-ui/icons'
import { format } from 'date-fns'


// Try to use custom date picker but difficult to navigate by year
// import { SingleDatepicker } from 'chakra-dayzed-datepicker';

export interface GenderOption extends OptionBase {
  label: string;
  value: string;
}

export interface TechOption {
  key: number;
  value: string;
}

function App() {
  let todayDate: string = `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`  // today date for html date picker format
  const [isSubmit, setIsSubmit] = useState<boolean>(false);  // after successfully submit the form to load 2nd container
  const genderOptions: GenderOption[] = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]        // list of gender options for custom select
 const [dateInFormat,setDateInFormat]=useState<string|undefined>();

  // variable for form 
  const [firstName, setFirstName] = useState<string | number | undefined>('')
  const [lastName, setLastName] = useState<string | number | undefined>('')
  const [gender, setGender] = useState<GenderOption | null>();
  const [dob, setDob] = useState<string | number | undefined  >('')
  const [techStack, setTechStack] = useState<TechOption[]>([{ key: 1, value: '' }])
  const [email, setEmail] = useState<string | number | undefined>('')
  const [phoneNo, setPhoneNo] = useState<| number | undefined | string>('')

  // fields referrence
  const fnRef = useRef<HTMLInputElement>(null);
  const lnRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pnoRef = useRef<HTMLInputElement>(null);

  // varaible for form field validate
  const [firstNameValidate, setFirstNameValidate] = useState<boolean>(true)
  const [lastNameValidate, setLastNameValidate] = useState<boolean>(true)
  const [dobValidate, setDobValidate] = useState<boolean>(true)
  const [techStackValidate, setTechStackValidate] = useState<boolean>(true)
  const [emailValidate, setEmailValidate] = useState<boolean>(true)
  const [phoneNoValidate, setPhoneNoValidate] = useState<boolean>(true)
  const [submitIcon,setSubmitIcon]=useState<boolean>(false)

  // select custom component for check icon at right side
  // <Icon as={MdCheck} color="green" mr={2} h={5} w={5} />
  const customComponents = {
    Option: ({ children, ...props }: any) => (
      <chakraComponents.Option {...props} >
        <div className='separate'> <span >{children}</span><span >{gender?.label === props.data.label ? (<CheckIcon color='green'/>) : ""}  </span> </div>
      </chakraComponents.Option>
    ),
    DropdownIndicator: (props: any) => (
      <chakraComponents.DropdownIndicator {...props} bg='seashell'>
        <TriangleDownIcon/>
      </chakraComponents.DropdownIndicator>
    )
  };

  // to validate and assign inputs to variable and update state
  const handleFirstName = (e: any) => {
    let fn = e.target.value.trim();
    let test: boolean = /^[A-Za-z]+$/.test(fn)
    fn.length ? setFirstNameValidate(test) : setFirstNameValidate(true)
    setFirstName(fn)
  }

  const handleLastName = (e: any) => {
    let ln = e.target.value.trim();
    let test: boolean = /^[A-Za-z]+$/.test(ln)
    ln.length ? setLastNameValidate(test) : setLastNameValidate(true)
    setLastName(ln)
  }

  const handleDob = (e: any) => {
    let tempDate=e.target.value;
    new Date(tempDate) < new Date() ? setDobValidate(true) : setDobValidate(false)
    let displayDate=format(new Date(tempDate),'dd|MMM|yyyy')
    setDateInFormat(displayDate);  
    setDob(tempDate)
  }

  const handleEmail = (e: any) => {
    let em = e.target.value;
    let test = /[a-zA-Z0-9+_-]+@[a-zA-Z0-9_]+\.com$/.test(em);
    em.length ? setEmailValidate(test) : setEmailValidate(true)
    setEmail(em)
  }

  const handlePhoneNo = (e: any) => {
    let pno = e.target.value
    let test = /^[6-9][0-9]{9}$/.test(pno)
    pno.length ? setPhoneNoValidate(test) : setPhoneNoValidate(true)
    setPhoneNo(pno)
  }

  // functions to add require functionality to tech stack
  const addInput = () => {
    const newInput = {
      key: techStack[techStack.length - 1].key + 1,
      value: ''
    }
    setTechStack([...techStack, newInput])
  }

  const removeInput = (key: number) => {
    const unDeltedTechStack = returnFiltered(key)
    setTechStack(unDeltedTechStack)
  }

  const returnFiltered = (key: number) => {
    return techStack.filter(el => el.key !== key)
  }

  const writeTechStackInput = (e: any, key: number) => {
    const unUpdateTechStack = returnFiltered(key)
    const newInput = {
      key: key,
      value: e.target.value
    }
    setTechStack([...unUpdateTechStack, newInput])
  }

  // to handle form submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    (!firstNameValidate) ? fnRef.current?.focus() : (!lastNameValidate) ? lnRef.current?.focus() : (!dobValidate) ? dobRef.current?.focus() : (!emailValidate) ? emailRef.current?.focus() : (!phoneNoValidate) ? pnoRef.current?.focus() : submitForm()
  }

  function submitForm() {
    setSubmitIcon(true)
   setTimeout(()=>{
     setIsSubmit(true)
   },3000)
  }

  return (
    <>
      {!isSubmit ? (<Container as="section" maxWidth="4xl">
        <Heading size='lg' textAlign='center' my={5}>User Details</Heading>
        <Card bg='seashell' p="5">
          <form onSubmit={handleSubmit}>
            <Heading size='md' mb='10px'>Basic Details </Heading>
            <SimpleGrid columns={2} columnGap={3} rowGap={5} >
              <GridItem colSpan={1}>
                <FormControl isRequired isInvalid={firstName === '' || !firstNameValidate} >
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="Enter First Name" ref={fnRef} value={firstName} onChange={handleFirstName}  autoComplete='off' />
                  {!(firstName === '') ? '' : (<FormErrorMessage>First name is required.</FormErrorMessage>)}
                  {firstNameValidate ? '' : (<FormErrorMessage>First name should contain charcaters only.</FormErrorMessage>)}
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired isInvalid={lastName === '' || !lastNameValidate} >
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="Enter Last Name" ref={lnRef} value={lastName} onChange={handleLastName} autoComplete='off' />
                  {!(lastName === '') ? '' : (<FormErrorMessage>Last name is required.</FormErrorMessage>)}
                  {lastNameValidate ? '' : (<FormErrorMessage>Last name should contain charcaters only.</FormErrorMessage>)}
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size='md' mt='5px'>Other Information </Heading>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired >
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="Gender"
                    options={genderOptions}
                    placeholder="Select Gender"
                    components={customComponents}
                    value={gender}
                    onChange={setGender}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired isInvalid={!dobValidate}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" placeholder="Enter Date of Birth" ref={dobRef} value={dob} onChange={handleDob}  />
                  {dobValidate ? '' : (<FormErrorMessage>Select valid date.</FormErrorMessage>)}
                  {/* <SingleDatepicker name="date" date={dob} onDateChange={setDob}/> */}
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} rowSpan={3}>
                <FormControl isRequired isInvalid={!techStackValidate} >
                  <Flex justify='space-between'>
                    <FormLabel>Tech Stack</FormLabel>
                    <Button bg='seashell' w={6} h={6} onClick={addInput} ><AddIcon/></Button>
                  </Flex>
                  {techStack.map((input: TechOption) => (
                    <InputGroup>
                      <Input key={input.key} type="text" placeholder="Enter Tech Stack" mb={5} value={input.value} onChange={(e) => writeTechStackInput(e, input.key)} autoComplete='off'  />{input.key === 1 ? ('') : (
                        <InputRightElement><Button h={5} w={2} bg='seashell' mr={1} onClick={() => removeInput(input.key)}><CloseIcon h={3} w={3}/></Button>
                        </InputRightElement>
                      )}
                    </InputGroup>
                  ))}
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired isInvalid={email === '' || !emailValidate} >
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" placeholder="Enter Email Address" ref={emailRef} value={email} onChange={handleEmail} autoComplete='off' />
                  {!(email === '') ? '' : (<FormErrorMessage>Email address is required.</FormErrorMessage>)}
                  {emailValidate ? '' : (<FormErrorMessage>Enter valid email address.</FormErrorMessage>)}
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired isInvalid={phoneNo === '' || !phoneNoValidate}>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>+91</InputLeftElement>
                    <Input type="tel" placeholder="Enter Phone Number" ref={pnoRef} value={phoneNo} onChange={handlePhoneNo} autoComplete='off'  />
                  </InputGroup>
                  {!(phoneNo === '') ? '' : (<FormErrorMessage>Phone number is required.</FormErrorMessage>)}
                  {phoneNoValidate ? '' : (<FormErrorMessage>Enter valid phone number.</FormErrorMessage>)}
                </FormControl>
              </GridItem>
            </SimpleGrid>
            <Flex justify='right'><Button type='submit' w={150} h={45}>{submitIcon?(<SpinnerIcon className='rotate'/>):(<Text fontSize='xl'>Submit</Text>)}</Button></Flex>
          </form>
        </Card>
      </Container>) :
        (<Container as="section" maxWidth="4xl" h='600px' my={10}>
          <Card bg='seashell' p="5"  h="100%" >
            <Text fontSize='2xl' >First Name&nbsp;  :&nbsp;  {firstName}</Text>
            <Text fontSize='2xl' >Last Name&nbsp;  :&nbsp;  {lastName}</Text>
            <Text fontSize='2xl' >Gender&nbsp;  :&nbsp;  {gender?.value}</Text>
            <Text fontSize='2xl' >Date of Birth&nbsp;  :&nbsp;  {dateInFormat}</Text>
            <Text fontSize='2xl' >Tech Stack&nbsp;  :&nbsp;  {techStack.map(el => el.value + ", ")}</Text>
            <Text fontSize='2xl' >Mobile No&nbsp;  :&nbsp;  +91-{phoneNo}</Text>
            <Text fontSize='2xl' >Email Address&nbsp;  :&nbsp;  {email}</Text>
          </Card>
        </Container>)} </>
  );
}

export default App;
