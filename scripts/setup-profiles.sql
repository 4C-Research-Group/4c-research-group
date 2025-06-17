-- Create profiles table
create table
if not exists public.profiles
(
  id uuid references auth.users on
delete cascade not null primary key,
  email text,
  role text
default 'user',
  created_at timestamp
with time zone default timezone
('utc'::text, now
()) not null,
  updated_at timestamp
with time zone default timezone
('utc'::text, now
()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for
select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for
insert
  with check ( auth.uid() =
id
);

create policy "Users can update own profile."
  on profiles for
update
  using ( auth.uid()
= id );

-- Create function to handle new user signup
create or replace function public.handle_new_user
()
returns trigger as $$
begin
  insert into public.profiles
    (id, email, role)
  values
    (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created
on auth.users;
create trigger on_auth_user_created
  after
insert on
auth.users
for each row
execute
procedure public.handle_new_user
(); 