DROP TABLE IF EXISTS public.profiles;

-- Primero crea una tabla de perfiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE, --Relación con auth.users
  registration TEXT UNIQUE,  --Matrícula del estudiante
  name TEXT,
  last_name TEXT,
  semester TEXT,
  engineering TEXT,
  service_id UUID,
  updated_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);

-- Habilita RLS (Row Level Security) para la tabla
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Crea una política que permita a los usuarios ver y actualizar solo su propio perfil
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Crea la función que manejará nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, registration, name, last_name, semester, engineering, service_id, updated_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'registration',
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'semester',
    NEW.raw_user_meta_data->>'engineering',
    (NEW.raw_user_meta_data->>'service_id')::UUID,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Crea el trigger que ejecuta la función cuando se crea un nuevo usuario
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();