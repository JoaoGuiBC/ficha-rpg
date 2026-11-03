<template>
    <ToastProvider :duration="4000">
        <div class="px-4 py-14">
            <NuxtPage />
        </div>

        <Toaster />
        <DeletionDialog />
    </ToastProvider>
</template>
