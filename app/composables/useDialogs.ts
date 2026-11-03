export function useDialogs() {
    /*
        NEW CHARACTER SECTION
    */
    const isNewCharacterDialogOpen = useState('dialog:new-character', () => false)

    function openNewCharacterDialog() {
        isNewCharacterDialogOpen.value = true
    }

    /*
        NEW SKILL SECTION
    */
    const isNewSkillDialogOpen = useState('dialog:new-skill', () => false)

    function openNewSkillDialog() {
        isNewSkillDialogOpen.value = true
    }

    /*
        NEW ITEM SECTION
    */
    const isNewItemDialogOpen = useState('dialog:new-item', () => false)

    function openNewItemDialog() {
        isNewItemDialogOpen.value = true
    }

    /*
        DELETION SECTION
    */
    const isDeletionDialogOpen = useState('dialog:deletion', () => false)
    const deletionTitle = useState('dialog:deletion:title', () => '')
    const deletionDescription = useState('dialog:deletion:description', () => '')
    const deletionUrl = useState('dialog:deletion:url', () => '')

    function openDeletionDialog(title: string, description: string, url: string) {
        deletionTitle.value = title
        deletionDescription.value = description
        deletionUrl.value = url
        isDeletionDialogOpen.value = true
    }

    return {
        isNewCharacterDialogOpen,
        openNewCharacterDialog,
        isNewSkillDialogOpen,
        openNewSkillDialog,
        isNewItemDialogOpen,
        openNewItemDialog,
        isDeletionDialogOpen,
        deletionTitle,
        deletionDescription,
        openDeletionDialog,
        deletionUrl,
    }
}
