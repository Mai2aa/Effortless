const { pgTable, varchar, text , serial } = require("drizzle-orm/pg-core");

export const JsonForms=pgTable('JsonForms',{
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    theme:varchar('theme'),
    background:varchar('background'),
    style:varchar('style'),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull()
})