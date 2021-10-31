<template>
  <v-card rounded>
    <v-card-title v-text="'Logs'" />

    <v-list>
      <v-list-item v-for="log of $accessor.logs" :key="log.id">
        <v-list-item-title v-text="log" />
      </v-list-item>
    </v-list>
  </v-card>
</template>
